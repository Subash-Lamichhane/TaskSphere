const axios = require('axios');

async function checkPermission(user, action, resource) {
    const opaUrl = "http://localhost:8181/v1/data/your_policy_package/allow";
    const input = {
        input: {
            user: user,
            action: action,
            resource: resource
        }
    };

    try {
        const response = await axios.post(opaUrl, input);
        return response.data.result;
    } catch (error) {
        console.error('Error checking permission:', error);
        return false;
    }
}

module.exports = checkPermission;
