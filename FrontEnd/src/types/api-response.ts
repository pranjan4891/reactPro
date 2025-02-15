export interface APIResponseIface {       
    
    success: boolean;
    data: any;
    exceptions: any;
    total ?: number;
    httpStatusCode: number;
      
      
}