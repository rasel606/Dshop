const ListOneService = async (Requst, dataModel, SearchArray, Joint1) => {

    try {

        let pageNo = Number(Requst.params.pageNo)
        let email = Requst.headers["email"]
        let parPage = Number(Requst.params.parPage)

        let searchValue = Requst.params?.searchKeyword
        let skipRow = (pageNo - 1) * parPage
        console.log(Requst.params, "line 1")
        let data
        if (searchValue == 0) {
            console.log(email)
            data = await dataModel.aggregate([

                Joint1,
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        row: [{ $skip: skipRow }, { $limit: parPage }]
                    }
                }
            ])

        }
        else {
            data = await dataModel.aggregate([

                Joint1,
                { $match: { $or: SearchArray } },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        row: [{ $skip: skipRow }, { $limit: parPage }]
                    }
                }

            ])

        }

        return { data }

    } catch (error) {
        return { status: "fail", data: error.toString() }
    }


};
module.exports = ListOneService;