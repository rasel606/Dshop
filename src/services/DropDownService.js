

const DropDownService = async (Requst, DataModel, Projection, sort) => {
    try {

        let email = Requst.headers["email"]


        let data = await DataModel.aggregate(
            [

                { $project: Projection },
                { $sort: sort }

            ]
        )

        return { data }
    }
    catch (error) {
        return { status: "Fail", data: error.toString() }
    }
};

module.exports = DropDownService
