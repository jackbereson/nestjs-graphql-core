hygen generate module-db student \
--fields "
name: { type: String },
age: { type: Number },
status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
parentRefId: { type: Schema.Types.ObjectId, ref: student },
" \
--enums "
export enum UserStatus {
    ACTIVE,
    DEACTIVED
    }
" \
--entities "
  @Field(function(){return String})
  name?: string

  @Field(function(){return Int})
  age?: number

  @Field(function(){return String})
  status?: string
"