const ListTwoService = async (Requst, dataModel, SearchArray, Joint1, Joint2) => {

    try {

        let pageNo = Number(Requst.params.pageNo)
        let email = Requst.body["email"]
        let parPage = Number(Requst.params.parPage)

        let searchValue = Requst.params?.searchKeyword
        let skipRow = (pageNo - 1) * parPage

        let data
        if (searchValue == 0) {

            data = await dataModel.aggregate([
                { $match: { email: email } },
                Joint1, Joint2,
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        row: [{ $skip: skipRow }, { $limit: parPage }]
                    }
                }
            ])

        }
        else {

            console.log(pageNo, parPage, searchValue, "line 1")


            data = await dataModel.aggregate([
                { $match: { email: email } },
                Joint1, Joint2,
                { $match: { $or: SearchArray } },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        row: [{ $skip: skipRow }, { $limit: parPage }]
                    }
                }

            ])

        }

        return { status: "success", data }

    } catch (error) {
        return { status: "fail", data: error.toString() }
    }


};
module.exports = ListTwoService;