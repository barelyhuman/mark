export default function Spacer(props) {
  const style = {
    height: 1,
    width: 1,
    display: props.inline ? 'inline-block' : 'block',
  };

  const spacingMultiplier = 8;

  if (props.x) {
    style.marginLeft = spacingMultiplier * props.x;
  }

  if (props.y) {
    style.marginTop = spacingMultiplier * props.y;
  }

  return <div style={style}>{props.children}</div>;
}
