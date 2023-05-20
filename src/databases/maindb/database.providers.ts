import * as mongoose from "mongoose";
import { configs } from "../../configs";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(configs.maindb),
  },
];
