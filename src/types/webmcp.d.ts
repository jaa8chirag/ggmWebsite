import "react";

declare module "react" {
  interface FormHTMLAttributes<T> extends React.DOMAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
  interface InputHTMLAttributes<T> extends React.DOMAttributes<T> {
    toolparamdescription?: string;
  }
  interface TextareaHTMLAttributes<T> extends React.DOMAttributes<T> {
    toolparamdescription?: string;
  }
}
