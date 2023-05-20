import { Subject } from "rxjs";
import { IActivity } from "../modules/activity/entities/activity.entity";
import { ActivityService } from "../modules/activity/activity.service";
export const onActivity = new Subject<IActivity>();

onActivity.subscribe(async (event) => {
    let userType = "ADMIN";
    if (event.customerId) {
        userType = "CUSTOMER";
    }
    event.message = `${userType} ${event.type} ${event.changedFactor} at id ${event.factorId}`;
    const activeService = new ActivityService();
    await activeService.create(event);
});
