export function validateSpaces(getFieldsValue, setFields) {
  const values = getFieldsValue();
  return Object.keys(values).forEach((key) => {
    if (typeof values[key] === 'string' && !values[key].trim().length) {
      setFields({
        [key]: {
          value: '',
        },
      });
    } else if (values[key] instanceof Array && !values[key].length) {
      setFields({
        [key]: {
          value: [],
        },
      });
    }
  });
}
