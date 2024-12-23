export const convertObjectToFormData = <D extends Object>(object: D) =>
  Object.entries(object).reduce((formData, [key, value]) => {
    formData.append(key, value);
    return formData;
  }, new FormData());
