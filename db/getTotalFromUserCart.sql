SELECT SUM(productprice)
FROM products FULL OUTER JOIN usercart ON products.id = usercart.productids
WHERE usercart.userid = $1 AND usercart.order_status IS NULL;