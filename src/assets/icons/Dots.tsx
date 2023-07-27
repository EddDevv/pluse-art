export const DotsIcon = ({ color }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="33"
    viewBox="0 0 34 33"
    fill="none"
  >
    <rect x="15" y="9" width="3" height="3" fill={color ? color : "#005A5A"} />
    <rect x="15" y="16" width="3" height="3" fill={color ? color : "#005A5A"} />
    <rect x="15" y="23" width="3" height="3" fill={color ? color : "#005A5A"} />
  </svg>
);
