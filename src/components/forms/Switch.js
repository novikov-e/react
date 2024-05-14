export default function Switch({state, onClick}) {
  return (
    <div
      className="custom-switch"
      onClick={onClick}
      style={{
        backgroundColor: state === 'disable' ? 'var(--red)' : state === 'enable' ? 'var(--green)' : 'var(--orange)',
        justifyContent: state === 'disable' ? 'left' : state === 'enable' ? 'right' : 'center',
      }}
    >
      <div className="custom-switch-button"></div>
    </div>
  );
}
