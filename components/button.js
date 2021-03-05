export default function Button ({ children, ...props }) {
  return (
    <>
      <button {...props}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            background: var(--bg);
            color: var(--fg);
            border: 2px solid var(--fg);
            border-radius: 4px;
            height: 32px;
            padding: 0 16px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            outline: var(--fg);
            transition: all 0.2s ease;
          }

          button:hover {
            border-color: #000;
            outline: #000;
            cursor: poiner;
            color: var(--bg);
            background: var(--fg);
          }
        `}
      </style>
    </>
  )
}
