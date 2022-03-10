var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's fullname
AuthorSchema.virtual('name').get(() => {
  if (!this.first_name || !this.family_name) {
    return '';
  }

  return `${this.family_name}, ${this.first_name}`;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(() => {
  if (!this.date_of_birth) {
    return '';
  }

  var date_of_birth = this.date_of_birth.getYear().toString();
  var date_of_death = this.date_of_death.getYear().toString();

  if (this.date_of_death) {
    return `${date_of_birth} - ${date_of_death}`;
  } else {
    return `${date_of_birth} -`;
  }
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(() => {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
