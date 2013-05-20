<?php
class Boxer
{
    public function build(){
        echo '<div class="box';
        echo ($this->done != 1) ? ' undone' : '';
        echo '">';
        echo ($this->slug != 'meta') ? '<img src="/img/full/'.$this->slug.'.png" alt="'.$this->title.'" class="full" />' : '';
        echo '<img src="/img/thumb/'.$this->slug.'.png" alt="'.$this->title.'" class="thumb" />';
        echo '<div class="desc';
        echo ($this->slug == 'meta') ? ' meta' : '';
        echo '""><h1>';
        echo ($this->done == 0) ? '<span class="progress">In Progress: </span>' : '';
        echo $this->title.'</h1><p>'.$this->blurb.'</p>';
        if ($this->done == 1 and $this->slug != 'meta' and $this->link) {
            echo '<span class="arrow">&rarr;</span><a href="http://'.$this->link.'" target="_blank" class="go">';
            echo ($this->showlink) ? $this->showlink : $this->link;
            echo '</a>';
        }
        echo '</div><!-- .desc --></div><!-- .box --><span class="closy"><img src="/img/x.png" alt="x"></span>';
    }
}
?>
