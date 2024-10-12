"use strict";

class AnimatorService {
    
    static pageOutro(page) {

    }

    static pageIntro(page) {

    }

    static transitionBackground(fromPage, toPage, usingTransition, duration) {

        let currentBG = App.backgrounds[fromPage.backgroundId];
        let toBG = App.backgrounds[toPage.backgroundId];

        if (fromPage.backgroundId == toPage.backgroundId) {

            currentBG.contentPosition(toPage.backgroundX, toPage.backgroundY);
            currentBG.transformationClass(toPage.backgroundTransformer);
            currentBG.transitionDuration(duration);

        }
        else {

            switch (usingTransition) {

                case PageTransition.SlideLeft:
                    currentBG.transitionDuration(duration);
                    currentBG.exitLeft();
                    currentBG.withoutfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterRight();
                    toBG.withoutfadeIn();
                    toBG.show();
                    break;
    
                case PageTransition.SlideRight:
                    currentBG.transitionDuration(duration);
                    currentBG.exitRight();
                    currentBG.withoutfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterLeft();
                    toBG.withoutfadeIn();
                    toBG.show();
                    break;

                case PageTransition.SlideUp:
                    currentBG.transitionDuration(duration);
                    currentBG.exitTop();
                    currentBG.withoutfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterBottom();
                    toBG.withoutfadeIn();
                    toBG.show();
                    break;

                case PageTransition.SlideDown:
                    currentBG.transitionDuration(duration);
                    currentBG.exitBottom();
                    currentBG.withoutfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterTop();
                    toBG.withoutfadeIn();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideLeft:
                    currentBG.transitionDuration(duration);
                    currentBG.exitLeft();
                    currentBG.withfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterRight();
                    toBG.withfadeIn();
                    toBG.show();
                    break;
    
                case PageTransition.FadeSlideRight:
                    currentBG.transitionDuration(duration);
                    currentBG.exitRight();
                    currentBG.withfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterLeft();
                    toBG.withfadeIn();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideUp:
                    currentBG.transitionDuration(duration);
                    currentBG.exitTop();
                    currentBG.withfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterBottom();
                    toBG.withfadeIn();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideDown:
                    currentBG.transitionDuration(duration);
                    currentBG.exitBottom();
                    currentBG.withfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterTop();
                    toBG.withfadeIn();
                    toBG.show();
                    break;

                case PageTransition.Fade:
                    currentBG.transitionDuration(duration);
                    currentBG.inPlace();
                    currentBG.withfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.inPlace();
                    toBG.withfadeIn();
                    toBG.show();
                    break;
                
                case PageTransition.None:
                default:
                    currentBG.transitionDuration(0);
                    currentBG.inPlace();
                    currentBG.withoutfadeOut();
                    currentBG.hide();
                    toBG.transitionDuration(0);
                    toBG.inPlace();
                    toBG.withoutfadeIn();
                    toBG.show();

            }
        }

    }

    static swapBackground() {

    }
    
}