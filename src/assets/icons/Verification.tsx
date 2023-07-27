export const VerificationIcon = ({ color }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      d="M13.8125 2.78906H3.1875C2.94093 2.78906 2.70446 2.88701 2.53011 3.06136C2.35576 3.23571 2.25781 3.47218 2.25781 3.71875V7.62145C2.25781 13.4811 7.21703 15.4255 8.21113 15.7555C8.39843 15.8193 8.60157 15.8193 8.78887 15.7555C9.78496 15.4235 14.7422 13.4811 14.7422 7.62145V3.71875C14.7422 3.47218 14.6442 3.23571 14.4699 3.06136C14.2955 2.88701 14.0591 2.78906 13.8125 2.78906ZM11.4378 6.62668C11.5124 6.70139 11.5543 6.80266 11.5543 6.90824C11.5543 7.01383 11.5124 7.1151 11.4378 7.1898L7.71906 10.9086C7.64436 10.9832 7.54309 11.0251 7.4375 11.0251C7.33191 11.0251 7.23064 10.9832 7.15594 10.9086L5.56219 9.3148C5.49181 9.23927 5.45349 9.13937 5.45531 9.03615C5.45713 8.93293 5.49895 8.83444 5.57195 8.76144C5.64495 8.68844 5.74344 8.64663 5.84666 8.64481C5.94988 8.64298 6.04978 8.6813 6.12531 8.75168L7.4375 10.0612L10.8747 6.62469C10.9494 6.55007 11.0507 6.50816 11.1562 6.50816C11.2618 6.50816 11.3631 6.55007 11.4378 6.62469V6.62668Z"
      fill={color ? color : "#008080"}
    />
  </svg>
);
