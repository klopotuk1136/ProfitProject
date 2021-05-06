SELECT USERNAME,
if(ISVENDOR, 'vendor', 'client')
AS ROLE
FROM profit.USER
