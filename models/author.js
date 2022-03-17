var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's fullname
AuthorSchema.virtual('name').get(function () {
  if (!this.first_name || !this.family_name) {
    return '';
  }

  return `${this.family_name}, ${this.first_name}`;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  if (!this.date_of_birth) {
    return '';
  }

  var formatted_date_of_birth = this.date_of_birth.getFullYear().toString();
  var formatted_date_of_death = this.date_of_death
    ? this.date_of_death.getFullYear().toString()
    : '';

  return `${formatted_date_of_birth} - ${formatted_date_of_death}`;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(() => {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
