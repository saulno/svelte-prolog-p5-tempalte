<script>
    import P5 from 'p5-svelte';

    export let size = 0;
    export let realModel = [[0,0], [0,0], [0,0], [0,0]];
    export let points = [];
    export let learntModel = [[0,0], [0,0], [0,0], [0,0]];
    export let showReal = true;
    export let showLearnt = true;

    const sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(size, size);
        };

        p5.draw = () => {
            p5.background(220);

            points.forEach(element => {
                if (element[2] === "in") {
                    p5.stroke(0, 0, 255);
                } else {
                    p5.stroke(255, 0, 0);
                }
                p5.strokeWeight(5);
                p5.point(element[0], size - element[1]);
            });
            
            p5.rectMode(p5.CORNERS);
            p5.strokeWeight(1)
            
            if (showReal) {
                p5.stroke(30, 200, 180);
                p5.noFill();
                p5.rect(realModel[0][0], size - realModel[0][1], realModel[1][0], size - realModel[1][1]);
                p5.rect(realModel[2][0], size - realModel[2][1], realModel[3][0], size - realModel[3][1]);
    
                p5.noStroke();
                p5.fill(30, 200, 180, 70);
                p5.rect(realModel[0][0], size - realModel[0][1], realModel[2][0], size - realModel[1][1]);
                p5.rect(realModel[3][0], size - realModel[0][1], realModel[1][0], size - realModel[1][1]);
                p5.rect(realModel[2][0], size - realModel[0][1], realModel[3][0], size - realModel[2][1]);
                p5.rect(realModel[2][0], size - realModel[3][1], realModel[3][0], size - realModel[1][1]);
            }
            if (showLearnt) {
                p5.stroke(200, 30, 100);
                p5.noFill();
                p5.rect(learntModel[0][0], size - learntModel[0][1], learntModel[1][0], size - learntModel[1][1]);
                p5.rect(learntModel[2][0], size - learntModel[2][1], learntModel[3][0], size - learntModel[3][1]);
    
                p5.noStroke();
                p5.fill(200, 30, 70, 50);
                p5.rect(learntModel[0][0], size - learntModel[0][1], learntModel[2][0], size - learntModel[1][1]);
                p5.rect(learntModel[3][0], size - learntModel[0][1], learntModel[1][0], size - learntModel[1][1]);
                p5.rect(learntModel[2][0], size - learntModel[0][1], learntModel[3][0], size - learntModel[2][1]);
                p5.rect(learntModel[2][0], size - learntModel[3][1], learntModel[3][0], size - learntModel[1][1]);
            }
        };
    };
</script>

<P5 {sketch}/>
