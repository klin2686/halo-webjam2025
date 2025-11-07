import type { Variants } from "framer-motion";

export const easing = {
  easeOut: [0.4, 0, 0.2, 1] as const,
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
};

export const pageLoadVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easing.easeOut,
    },
  },
};

export const tabSwitchVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easing.easeOut,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing.easeOut,
    },
  },
};

export const logoHoverVariants: Variants = {
  initial: {
    rotateY: 0,
    filter: "drop-shadow(0 0 0px rgba(0, 207, 255, 0))",
  },
  hover: {
    rotateY: 3,
    filter: "drop-shadow(0 0 8px rgba(0, 207, 255, 0.3))",
    transition: {
      duration: 0.4,
    },
  },
};

export const sidebarVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing.easeOut,
    },
  },
};

export const profileImageVariants: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing.easeOutBack,
    },
  },
};

export const foodItemHoverVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: easing.easeOut,
    },
  },
  tap: {
    scale: 0.99,
  },
};

export const buttonScaleVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: easing.easeOut,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const iconButtonVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: easing.easeOut,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export const buttonGlowVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0 0 0px rgba(86, 190, 204, 0)",
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 0 15px rgba(86, 190, 204, 0.4)",
    transition: {
      duration: 0.3,
      ease: easing.easeOut,
    },
  },
  tap: {
    scale: 0.97,
  },
};

export const allergyChipVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: easing.easeOut,
    },
  },
  tap: {
    scale: 0.99,
  },
};
