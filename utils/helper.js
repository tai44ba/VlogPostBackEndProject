export const genEmailTemplate = (name, token, userid) => {
    const link = `https://localhost:5000/users/confirm/${token}/${userid}`
    return `
        Hi ${name}!<br/><br/>
        Thank you for joining us. Please click on the following link to confirm and activate your account: <br />
        <a href="${link}">${link}</a><br/><br/>

        good luck!
    `
}