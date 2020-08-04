export default function Button({ children, ...props }) {
  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>{`
        button {
          background: #000;
          color: #fff;
          border: 2px solid rgba(12, 12, 13, 0.1);
          border-radius: 4px;
          height: 32px;
          padding: 0 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
        }

        button:hover {
          border-color: #000;
          outline: #000;
          color: #000;
          background: #fff;
        }
      `}</style>
    </>
  );
}
