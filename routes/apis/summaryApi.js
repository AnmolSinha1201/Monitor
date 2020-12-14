import * as summaryService from "../../services/summaryService.js";


export const getSummaryForAll = async({response}) => {
	response.body = await summaryService.getSummaryForAllFor7Days();
};

export const getSummaryForAllOnSpecificDay = async({response, params}) => {
    const date = `${params.year}-${params.month}-${params.day}`;
	response.body = await summaryService.getSummaryForAllForSpecificDay(date);
};