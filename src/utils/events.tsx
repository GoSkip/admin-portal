export const stopPropagation = (e: any) => {
  if (e && e.stopPropagation && typeof e.stopPropagation === "function") {
    e.stopPropagation();
  }
};
