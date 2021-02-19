import cn from 'classnames';

export default function Button({ children, dark, ...props }) {
  const classes = cn({
    dark,
  });

  return (
    <>
      <button className={classes} {...props}>
        {children}
      </button>
      <style jsx>{`
        button {
          background: #000;
          color: #fff;
          border: 2px solid #000;
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
          color: #000;
          background: transparent;
        }

        button.dark {
          background: #fff;
          color: #000;
          border: 2px solid #fff;
        }

        button.dark:hover {
          border-color: #fff;
          outline: #fff;
          color: #fff;
          background: transparent;
        }
      `}</style>
    </>
  );
}
