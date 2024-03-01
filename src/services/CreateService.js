

const CreateService = async (Requst, DataModel) => {
    try {
        let PostBody = Requst.body

        PostBody.email = Requst?.headers["email"]

        let data = await DataModel.create(PostBody)

        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "Fail", data: error.toString() }
    }
};

module.exports = CreateService 