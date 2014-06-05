<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta name="description" content="Superlative web development. Anything is possible.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Anthony SCHWARTZMAN Interactive</title>
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico?v=2">
        <link rel="stylesheet" href="/lib/style.css">
        <?php $basebox = 185; ?>
        <script type="text/javascript">
            var basebox = <?=$basebox?>;
        </script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
        <script type="text/javascript" src="/lib/js/jquery.animate-colors-min.js"></script>
        <script type="text/javascript" src="/lib/js/jquery.masonry.min.js"></script>
        <script type="text/javascript" src="//use.typekit.net/yxs2cfa.js"></script>
        <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

        <style type="text/css">
            .box {
                height: <?=$basebox?>px;
                width: <?=$basebox?>px;
            }
        </style>
        <?php
        include 'lib/config.php';
        include 'Boxer.php';
        $mysqli = new mysqli($host,$username,$passwd,$dbname);
        if ($mysqli->connect_error) {
            die('Database Connection Error ('.$mysqli->connect_errno.') '.$mysqli->connect_error);
        }
        if ( $folio_raw = $mysqli->query('SELECT sort, slug, title, link, showlink, blurb, done FROM portfolio WHERE display=1 ORDER BY sort') ) {
            while ( $folio = $folio_raw->fetch_object('Boxer') ) {
                $folios[] = $folio;
            }
        }
        $mysqli->close();
        ?>
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', '<?=$analytics_id?>']);
            _gaq.push(['_trackPageview']);

            (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
    </head>
    <body>
        <div id="head">
            <img src="/img/logo.png" alt="Anthony SCHWARTZMAN Interactive">
            <div><span class="breaker">php &middot; mysql &middot; apache &middot; bash &middot; </span>javascript &middot; jquery &middot; ember &middot; sass+bourbon</div>
        </div><!-- #head -->
        <div id="boxes">
            <?php foreach ($folios as $folio) : ?>
            <div class="overbox">
                <?php $folio->build(); ?>
            </div><!-- .overbox -->
            <?php endforeach; ?>
        </div><!-- #boxes -->
        <script type="text/javascript" src="/lib/js/interface.js"></script>
    </body>
</html>
