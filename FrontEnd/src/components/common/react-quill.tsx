import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const QuillTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  className,
  style,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className={className}
      style={style}
    />
  );
};

export default QuillTextEditor;
