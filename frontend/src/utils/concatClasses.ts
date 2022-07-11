type ConcatClasses = (...classes: (string | undefined)[]) => string;

const concatClasses: ConcatClasses = (...classes) => {
  return classes.filter((cl) => cl !== undefined).join(" ");
};

export default concatClasses;
