hygen generate module-db lesson \
--fields "
name: { type: String },
studentId: { type: Schema.Types.ObjectId, ref: student },
" \
--enums "" \
--entities "
  @Field(function(){return String})
  name?: string

  @Field(function(){return Int})
  age?: number

  @Field(function(){return ID})
  studentId?: string
"