SELECT USER.USERNAME, IFNULL(REVIWS_AMOUNT.AMOUNT_REVIEWS, 0) AS AMOUNT_REVIEWS FROM profit.USER
LEFT JOIN (SELECT REVIEWS.USERNAME,REVIEWS.REVIEW_DATE, count(*) AMOUNT_REVIEWS 
	FROM profit.REVIEWS
    WHERE month(REVIEWS.REVIEW_DATE) = 5 AND day(REVIEWS.REVIEW_DATE) = 9
	GROUP BY REVIEWS.USERNAME)
AS REVIWS_AMOUNT 
ON USER.USERNAME = REVIWS_AMOUNT.USERNAME