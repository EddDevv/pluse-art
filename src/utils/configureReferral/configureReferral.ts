export const configureReferral = (from: number, to: number) => {
	// const { userData } = useAppSelector((state) => state.userInfo);

	const userData = {
		body: {
			userName: "121212",
		},
	};

	const fullPath = window.location.href.split("");
	fullPath.splice(from, to);
	const full = `${fullPath.join("")}/singup/${userData.body.userName}`;
	const short = `${fullPath.join("")}${userData.body.userName}`;
	const links = {
		fullLink: full,
		shortLink: short,
	};

	return links;
};
