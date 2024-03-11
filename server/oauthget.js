import axios from 'axios';

export async function userToken(authOptions) {
    const result = await axios( {
    url: authOptions.url,
    method: "post",
    headers: authOptions.headers,
    data: authOptions.form,
    timeout: 20000
});
    console.log(result)
    return result.data;
};