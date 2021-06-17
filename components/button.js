
export default function Button({ children, ...props }) {
  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>
        {`
          button {
            background: var(--bg);
            color: var(--fg);
            border: 0px;
            border-radius: 4px;
            height: 32px;
            padding: 0 16px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            outline: var(--fg);
            font-weight: bold;
            transition: all 0.2s ease;
          }

          button:hover {
            border-color: #000;
            outline: #000;
            cursor: poiner;
            background: var(--bg-lighter);
          }
        `}
      </style>
    </>
  );
}
