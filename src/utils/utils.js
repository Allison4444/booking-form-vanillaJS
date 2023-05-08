const createOption = (value, text, select) => {
  const option = document.createElement('option');
  option.value = value;
  option.text = text;
  option.classList.add('form__option');

  select.append(option);
}

export { createOption };
