SELECT *
FROM usercart uc, products p
WHERE userid = $1 AND uc.productids = p.id ;