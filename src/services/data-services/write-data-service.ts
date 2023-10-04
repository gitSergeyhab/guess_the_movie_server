import { ITest } from "../../types/test-type";
import { RusTestModel } from "../../models/tests";
import { ApiError } from "../../middlewares/error-middleware";
import { StatusCode } from "../../const";


class WriteDataService {
    async writeRusTestsToDB (tests: ITest[]) {
        RusTestModel.insertMany(tests)
            .then(() => console.log('writeRusTestsToDB Finished: Success'))
            .catch((err) => {
                console.error(`writeRusTestsToDB Error: ${err}`) 
                throw new ApiError(StatusCode.ServerError, 'writeRusTestsToDB Error')
            })
    }

}

export const writeDataService = new WriteDataService()