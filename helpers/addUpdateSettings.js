//  (new) для повернення оновленого об'єкту 
// (runValidators) для перевірки по mongoose схемі
const addUpdateSettings =  (next)=> {
    this.options.new = true;
    this.options.runValidators = true;
    next()
  };

  export default addUpdateSettings;