xquery version "1.0-ml";

import module namespace vh = "http://marklogic.com/roxy/view-helper" at "/roxy/lib/view-helper.xqy";

declare option xdmp:mapping "false";

(: use the vh:required method to force a variable to be passed. it will throw an error
 : if the variable is not provided by the controller :)
(:
  declare variable $title as xs:string := vh:required("title");
    or
  let $title as xs:string := vh:required("title");
:)

(: grab optional data :)
(:
  declare variable $stuff := vh:get("stuff");
    or
  let $stuff := vh:get("stuff")
:)

<div xmlns="http://www.w3.org/1999/xhtml" class="mldbtest kratu">

<link rel="stylesheet" type="text/css" href="/css/kratu.css" />
<script type="text/javascript" src="/js/kratu.js"></script>
<script type="text/javascript" src="/js/dataproviders/json.js"></script>


<link rel="stylesheet" type="text/css" href="/js/mldbtest/widgets.css" />
<script type="text/javascript" src="/js/lib/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/js/mldbtest/mldb.js"></script>
<script type="text/javascript" src="/js/mldbtest/mldb-jquery.js"></script>

<script type="text/javascript" src="/js/mldbtest/widgets.js"></script>
<script type="text/javascript" src="/js/mldbtest/widget-search.js"></script>
<script type="text/javascript" src="/js/mldbtest/widget-kratu.js"></script>

<script type="text/javascript" src="/js/mldbtest/page-kratu.js"></script>
  
<div id="el-kratu"></div>

</div>