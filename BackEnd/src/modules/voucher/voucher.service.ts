import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Model, Types } from 'mongoose';
import { Voucher, VoucherDocument } from 'src/schemas/voucher.schema';
import { InjectModel } from '@nestjs/mongoose';
import { sendMail } from 'src/util/mailer.util';
import { generateVoucherCode } from 'src/util/generateVoucherCode';
import { generateEmailTemplate } from 'src/templates/generateEmail';
import { generateVoucherPDF } from 'src/templates/generateVoucherPDF';
import { generateMovieVoucherPDF } from 'src/templates/generateMovieVoucher';
import { VoucherChoicesEmailTemplate } from 'src/templates/voucherChoices-email-template';
import { JwtPayload } from 'src/middleware/jwt-payload.interface';
import { VoucherStatus } from 'src/schemas/status.enum';
import { convertStringToObjectId } from 'src/util/common';
import { UpdateFinalChoiceDto } from './dto/UpdateFinalChoice.dto';
import { generateFinalChoiceEmailTemplate } from 'src/templates/finalChoice';
import { PaymentStatusEmailTemplate } from 'src/templates/generatePaymentStatusEmailTemplate';
import { PaymentStatusDto } from './dto/paymentStatus.dto';
import { VoucherChoicesAdminEmailTemplate } from 'src/templates/VoucherChoiceAdmin';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
  ) {}
  async create(
    createVoucherDto: CreateVoucherDto,
    user: JwtPayload,
  ): Promise<any> {
    const { id } = user;

    console.log('UserId:', id);

    // Generate random voucher code
    const voucherCode = generateVoucherCode();

    // Check if email or phone already exists
    const existingVoucher = await this.voucherModel.findOne({
      $or: [
        { email: createVoucherDto.email },
        { phone: createVoucherDto.phone },
      ],
    });

    const generatedDate = new Date();
    const expiryDate = new Date(generatedDate); // Clone date
    expiryDate.setMonth(generatedDate.getMonth() + 6); // Add 6 months

   
    let voucher;
    if (existingVoucher) {
      console.log('Existing voucher found:', existingVoucher);

      // Update the existing voucher
      existingVoucher.voucherCode = voucherCode;
      existingVoucher.status = VoucherStatus.EMAIL_SENT;
      existingVoucher.generatedDate = generatedDate;
      existingVoucher.expiryDate = expiryDate;
      existingVoucher.isMovieVoucherSent=true;
      existingVoucher.generatedBy = convertStringToObjectId(id);

      voucher = await existingVoucher.save();
    } else {
      // Create a new voucher
      voucher = new this.voucherModel({
        ...createVoucherDto,
        voucherCode,
        status: VoucherStatus.EMAIL_SENT,
        generatedDate,
        expiryDate,
        isMovieVoucherSent: createVoucherDto.isMovieVoucher, // Added the key
        generatedBy: convertStringToObjectId(id),
   
      });

      voucher = await voucher.save();
    }

    // Handle email sending (shared logic)
    await this.handleEmailSending(
      createVoucherDto,
      voucher,
      voucherCode,
      generatedDate,
    );

    return {
      message: existingVoucher
        ? 'Voucher updated and email sent successfully!'
        : 'Voucher created and email sent successfully!',
      voucher,
    };
  }

  private async handleEmailSending(
    createVoucherDto: CreateVoucherDto,
    voucher: any,
    voucherCode: string,
    generatedDate: Date,
  ): Promise<void> {
    const voucherUrl = `https://app.theholidaysclubs.com/Voucher/temp/${voucher._id}`;
    const subject = `The Holidays Club Gift Voucher: ${voucherCode}`;

    // Generate the email template
    const emailTemplate = generateEmailTemplate({
      name: createVoucherDto.customerName,
      giftCode: voucherCode,
      issueDate: generatedDate.toISOString().split('T')[0],
      expiryDate: voucher.expiryDate.toISOString().split('T')[0],
      voucherUrl,
    });

    // Generate attachments
    const attachments: {
      filename: string;
      content: Buffer;
      contentType: string;
    }[] = [
      {
        filename: 'Voucher.pdf',
        content: await generateVoucherPDF({
          name: createVoucherDto.customerName,
          giftCode: voucherCode,
          issueDate: generatedDate.toISOString().split('T')[0],
          expiryDate: voucher.expiryDate.toISOString().split('T')[0],
          voucherUrl,
        }),
        contentType: 'application/pdf',
      },
    ];

    if (createVoucherDto.isMovieVoucher) {
      const movieVoucherAttachment = await generateMovieVoucherPDF({
        name: createVoucherDto.customerName,
        giftCode: voucherCode,
        expiryDate: voucher.expiryDate.toISOString().split('T')[0],
      });

      console.log('Movie Voucher Attachment:', movieVoucherAttachment);

      attachments.push({
        filename: 'MovieVoucher.pdf',
        content: movieVoucherAttachment,
        contentType: 'application/pdf',
      });
    }

    console.log('Attachments before email:', attachments);

    try {
      // Send email with attachments
      await sendMail(
        createVoucherDto.email,
        subject,
        emailTemplate,
        attachments,
      );

      // Update voucher status to indicate email sent
      voucher.status = VoucherStatus.EMAIL_SENT;
      await voucher.save();
    } catch (error) {
      console.error('Error sending email:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  async findAll(page: number, limit: number, search: string) {
    // Ensure page and limit are numbers
    const currentPage = Math.max(1, Number(page)); // Ensure page is at least 1
    const pageSize = Math.min(100, Math.max(1, Number(limit))); // Ensure limit is between 1 and 100

    // Build search filter
    const filter: any = search
      ? { customerName: { $regex: search, $options: 'i' } } // Search by customerName
      : {}; // Adjust to match your database structure

    // Calculate skip value
    const skip = (currentPage - 1) * pageSize;

    // Fetch data with populated user field
    const [data, total] = await Promise.all([
      this.voucherModel
        .find(filter)
        .skip(skip)
        .limit(pageSize)
        .populate('generatedBy', 'name email role')
        .exec(),
      this.voucherModel.countDocuments(filter), // Total count matching the filter
    ]);

    if (data.length === 0) {
      return {
        message: 'No vouchers found',
        data: [],
        total,
        page: currentPage,
        limit: pageSize,
        totalPages: 0,
      };
    }

    return {
      data,
      total,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async updateChoice(
    id: string,
    updateVoucherDto: UpdateVoucherDto,
  ): Promise<any> {
    try {
      const { choices, dates } = updateVoucherDto;

      // Validate the voucher ID format
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException({
          msg: 'Invalid ID format',
          remarks: 'VALIDATION_FAILED',
          errors: {
            id: ['Invalid ID format'],
          },
        });
      }

      // Validate date fields
      const validateDate = (date: string) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          throw new BadRequestException({
            msg: 'Invalid date format for choice.',
            remarks: 'VALIDATION_FAILED',
            errors: {
              date: ['Invalid date format'],
            },
          });
        }
        return parsedDate;
      };

      const validatedDates = dates.map((date) => validateDate(date));

      // Create the new choice object
      const newChoice = {
        createdAt: new Date(),
        choice1: {
          city: choices[0],
          date: validatedDates[0],
        },
        choice2: {
          city: choices[1],
          date: validatedDates[1],
        },
        choice3: {
          city: choices[2],
          date: validatedDates[2],
        },
      };

      // Find the existing voucher
      const existingVoucher = await this.voucherModel.findById(id);
      if (!existingVoucher) {
        throw new NotFoundException({
          errorCode: 'NO_RECORD_FOUND',
          remarks: 'NO_RECORD_FOUND',
          msg: `Voucher with ID ${id} not found`,
          data: null,
        });
      }

      // Determine the status
      const status =
        !existingVoucher.choices?.length && !existingVoucher.currentChoice
          ? VoucherStatus.CUSTOMER_FILLED_CHOICES
          : VoucherStatus.MODIFIED;

      // Update the voucher
      const voucher = await this.voucherModel.findByIdAndUpdate(
        id,
        {
          $push: { choices: newChoice }, // Push new choice to choices array
          $set: { currentChoice: newChoice, status }, // Update currentChoice and status
        },
        { new: true }, // Return the updated document
      );

      if (!voucher) {
        throw new NotFoundException({
          errorCode: 'NO_RECORD_FOUND',
          remarks: 'NO_RECORD_FOUND',
          msg: `Voucher with ID ${id} not found`,
          data: null,
        });
      }

      console.log('Voucher updated successfully:', voucher);

      // Send email notification
      const emailContent = VoucherChoicesEmailTemplate(newChoice, voucher);
      const emailContentAdmin = VoucherChoicesAdminEmailTemplate(
        newChoice,
        voucher,
      );
      try {
        await sendMail(
          voucher.email, // Recipient's email
          `The Holidays Club Gift Voucher: ${voucher.voucherCode}`,
          emailContent,
          [],
        );
        console.log(`Successfully sent email to user: ${voucher.email}`);

        // Send email to your E-mail EVERY UPDATE
        await sendMail(
          'booking@theholidaysclubs.com',
          `Voucher Choice Updated: ${voucher.voucherCode}`,
          emailContentAdmin,
          [],
        );
      } catch (error) {
        console.error('Failed to send email:', error);
        throw new InternalServerErrorException(
          'Choice updated, but email could not be sent.',
        );
      }

      return {
        message:
          'Choice successfully added/updated, currentChoice updated, and email sent.',
        updatedVoucher: voucher,
      };
    } catch (error) {
      console.error('Error during updateChoice:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw known exceptions
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during the voucher update.',
      );
    }
  }

  async updateFinalChoice(
    id: string,
    userId: string,
    updateFinalDto: UpdateFinalChoiceDto,
  ): Promise<any> {
    try {
      const { city, date } = updateFinalDto;

      console.log(city, date, 'update dto');
      console.log(userId, 'userid');

      // Validate the voucher ID format
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException({
          msg: 'Invalid ID format',
          remarks: 'VALIDATION_FAILED',
          errors: {
            id: ['Invalid ID format'],
          },
        });
      }

      // Validate the date field
      const validateDate = (date: string) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          throw new BadRequestException({
            msg: 'Invalid date format.',
            remarks: 'VALIDATION_FAILED',
            errors: {
              date: ['Invalid date format'],
            },
          });
        }
        return parsedDate;
      };

      const validatedDate = validateDate(date);

      // Create the final choice object
      const finalChoice = {
        createdAt: new Date(),
        generatedBy: convertStringToObjectId(userId),
        city,
        date: validatedDate,
      };

      // Update the finalChoice field and status
      const voucher = await this.voucherModel.findByIdAndUpdate(
        id,
        {
          $set: {
            finalChoice, // Update the finalChoice field
            status: VoucherStatus.FINAL_CHOICE, // Update the status to FINAL_CHOICE
          },
        },
        { new: true }, // Return the updated document
      );

      if (!voucher) {
        throw new NotFoundException({
          errorCode: 'NO_RECORD_FOUND',
          remarks: 'NO_RECORD_FOUND',
          msg: `Voucher with ID ${id} not found`,
          data: null,
        });
      }

      console.log('Voucher updated successfully:', voucher);

      // Send email notification
      const emailContent = generateFinalChoiceEmailTemplate(
        city,
        validatedDate,
      );
      try {
        await sendMail(
          voucher.email, // Recipient's email
          `The Holidays Club Gift Voucher: ${voucher.voucherCode}`, // Subject
          emailContent, // Email body
          [], // Attachments (optional)
        );
      } catch (error) {
        if (
          error instanceof NotFoundException ||
          error instanceof BadRequestException
        ) {
          throw error; // Re-throw known exceptions
        }

        throw new InternalServerErrorException(
          'Final choice updated, but email could not be sent.',
        );
      }

      return {
        message: 'Final choice successfully updated and email sent.',
        updatedVoucher: voucher,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw known exceptions
      }
      console.error('Error during updateFinalChoice:', error);
      throw new InternalServerErrorException(
        'An unexpected error occurred during the voucher update.',
      );
    }
  }

  async paymentUpdate(
    id: string,
    userId: string,
    paymentStatusDto: PaymentStatusDto,
  ): Promise<any> {
    try {
      console.log(userId, 'userid');

      // Validate the voucher ID format
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException({
          msg: 'Invalid ID format',
          remarks: 'VALIDATION_FAILED',
          errors: {
            id: ['Invalid ID format'],
          },
        });
      }

      // Find the voucher by ID and ensure it belongs to the user
      const voucher = await this.voucherModel.findOne({
        _id: convertStringToObjectId(id),
      });

      if (!voucher) {
        throw new NotFoundException({
          msg: `Voucher with ID ${id} not found or does not belong to the user.`,
          remarks: 'NOT_FOUND',
          errors: {
            voucher: ['Voucher not found'],
          },
        });
      }

      // Add status validation check
      if (voucher.status !== VoucherStatus.FINAL_CHOICE) {
        throw new BadRequestException({
          msg: 'Payment can only be updated for vouchers with final choice confirmed',
          remarks: 'VALIDATION_FAILED',
          errors: {
            status: [
              `Current status is ${voucher.status} - must be FINAL_CHOICE`,
            ],
          },
        });
      }

      // Update payment status if paymentReceived is true
      if (paymentStatusDto.paymentReceived) {
        voucher.status = VoucherStatus.PAYMENT_RECEIVED;
      }

      // Save the updated voucher
      await voucher.save();

      console.log('Voucher payment status updated successfully:', voucher);

      // Send email after updating payment status
      try {
        console.log('Voucher==>', voucher);
        const emailContent = PaymentStatusEmailTemplate(voucher);
        await sendMail(
          voucher.email, // Recipient's email
          `The Holidays Club Gift Voucher: ${voucher.voucherCode}`, // Subject
          emailContent, // Email body
          [], // Attachments (optional)
        );
      } catch (error) {
        if (
          error instanceof NotFoundException ||
          error instanceof BadRequestException
        ) {
          throw error; // Re-throw known exceptions
        }
        throw new InternalServerErrorException(
          'Payment status updated, but email could not be sent.',
        );
      }

      return {
        message: 'Payment status successfully updated and email sent.',
        updatedVoucher: voucher,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw known exceptions
      }
      console.error('Error during payment update:', error);
      throw new InternalServerErrorException(
        'An unexpected error occurred during the payment update.',
      );
    }
  }

  async findOne(id: string): Promise<Voucher> {
    // Validate the ID format (check if it's a valid MongoDB ObjectId)
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({
        msg: 'Invalid ID',
        remarks: 'VALIDATION_FAILED',
        errors: {
          id: ['Invalid ID format'],
        },
      });
    }

    try {
      // Find the voucher by ID and populate the 'generatedBy' field
      const voucher = await this.voucherModel
        .findById(id)
        .populate('generatedBy', 'name email role')
        .lean()
        .exec();

      if (!voucher) {
        throw new NotFoundException({
          errorCode: 'NO_RECORD_FOUND',
          remarks: 'NO_RECORD_FOUND',
          exceptions: null,
          errors: null,
          msg: `Voucher with ID ${id} not found`,
          data: [],
        });
      }

      return voucher;
    } catch (error) {
      console.error('Error fetching voucher:', error);

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw known exceptions
      }

      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }
}
