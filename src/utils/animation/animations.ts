export const leftShiftAnimation = {
  hidden: {
    x: -300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1,
    },
  },
};
export const skewRotateScaleAnimation = {
  hidden: {
    skewX: -15,
    skewY: -15,
    scale: 0.1,
    rotate: 180,
    opacity: 0,
  },
  visible: {
    skewX: 0,
    skewY: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 1,
    },
  },
};
export const leftDownAnimation = {
  hidden: {
    x: -300,
    y: 300,
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 2.5,
    },
    scale: 1,
  },
};
export const rotateScaleAnimation = {
  hidden: {
    scale: 0.1,
    rotate: 180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 1.5,
    },
  },
};

export const upAnimation = {
  hidden: (custom: number) => ({
    y: (1 / custom) * 200,
    opacity: 0,
  }),
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: (custom - 0.8) * 0.3,
      duration: 1,
    },
  }),
};

export const fadeOutAnimation = {
  hidden: (custom: number) => ({
    opacity: 0,
  }),
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      delay: 10 + (custom - 0.8) * 0.4,
      duration: 0.5,
    },
  }),
};

export const commonRightShiftAnimation = {
  hidden: (custom: number) => ({
    x: (1 / custom) * 400,
    opacity: 0,
  }),
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: (custom - 0.8) * 0.3,
      duration: 1,
    },
  }),
};

export const commonLeftShiftAnimation = {
  hidden: (custom: number) => ({
    x: (1 / custom) * -400,
    opacity: 0,
  }),
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: (custom - 0.8) * 0.3,
      duration: 1,
    },
  }),
};

export const upDownAnimation = {
  hidden: {
    y: 0,
  },
  visible: {
    y: 300,
    transition: {
      delay: 0.3,
      duration: 2,
    },
  },
};
