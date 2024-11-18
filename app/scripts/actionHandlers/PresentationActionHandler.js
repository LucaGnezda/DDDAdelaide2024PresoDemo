/**
 * @class
 * @public
 * @constructor
 */
class PresentationActionHandler {
    /**
     * Handler metod for incoming actions
     * @param {Action} action
     */
    route(action) {
        Log.debug(`${this.constructor.name} processing event ${action.type}`, "HANDLER");

        switch (action.type) {
            case "App_PageAnimation":
                this.animatePage(action.payload);
                break;

            case "App_PageTransition":
                this.transitionPage(action.payload);
                break;

            case "App_OverlayAnimation":
                this.transitionPageOverlay(action.payload);
                break;

            default:
            // do nothing
        }
    }

    /**
     * @typedef {Object} AnimateContentPageEvent
     * @property {*} originatingObject
     * @property {KeyboardEvent|MouseEvent} originatingEvent
     * @property {PageNode} activePage
     * @property {boolean} inReverse
     */

    /**
     * Animates a page
     * @param {AnimateContentPageEvent} payload
     * @returns {void}
     */
    animatePage(payload) {
        if (payload.inReverse) {
            payload.activePage.content?.stepAnimationBack();
            if (payload.activePage.includeBackgroundAnimation) {
                payload.activePage.background?.stepAnimationBack();
            }
        } else {
            payload.activePage.content?.stepAnimationForward();
            if (payload.activePage.includeBackgroundAnimation) {
                payload.activePage.background?.stepAnimationForward();
            }
        }
    }

    /**
     * @typedef {Object} TransitionContentPageEvent
     * @property {*} originatingObject
     * @property {KeyboardEvent|MouseEvent} originatingEvent
     * @property {PageNode} transitionFromPage
     * @property {PageNode} transitionToPage
     * @property {PageTransition} usingTransition
     * @property {boolean} inReverse
     * @property {number} withDuration
     */

    /**
     * Animates a page overlay
     * @param {TransitionContentPageEvent} payload
     * @returns {void}
     */
    transitionPage(payload) {
        if (payload.inReverse) {
            payload.transitionToPage.content?.resetAnimationFinal();
            payload.transitionToPage.content?.resetAnimationFinal("pageOverlay");
        } else {
            payload.transitionToPage.content?.resetAnimationInitial();
            payload.transitionToPage.content?.resetAnimationInitial("pageOverlay");
        }

        AnimatorService.pageOutro(payload.transitionFromPage.content, payload.usingTransition, payload.withDuration);
        AnimatorService.transitionBackground(payload.transitionFromPage.background, payload.transitionToPage.background, payload.transitionToPage.backgroundX, payload.transitionToPage.backgroundY, payload.transitionToPage.backgroundTransformer, payload.usingTransition, payload.withDuration);
        AnimatorService.pageIntro(payload.transitionToPage.content, payload.usingTransition, payload.withDuration);

        App.activePage = payload.transitionToPage;
    }

    /**
     * @typedef {Object} AnimateContentPageOverlayEvent
     * @property {*} originatingObject
     * @property {KeyboardEvent|MouseEvent} originatingEvent
     * @property {PageNode} activePage
     * @property {boolean} inReverse
     * @property {OverlayAction} usingAction
     * @property {number} withDuration
     */

    /**
     * Action that can be applied to a page overlay
     * @typedef {'open'|'close'|'animate'} OverlayAction
     */

    /**
     * Animates a page overlay
     * @param {AnimateContentPageOverlayEvent} payload
     * @returns {void}
     */
    transitionPageOverlay(payload) {
        if (payload.usingAction == 'animate') {
            if (payload.inReverse) {
                payload.activePage.content?.stepAnimationBack("pageOverlay");
            } else {
                payload.activePage.content?.stepAnimationForward("pageOverlay");
            }
        } else {
            AnimatorService.transitionPageOverlay(payload.usingAction, payload.activePage.content, payload.withDuration);
        }
    }

    /**
     * Zooms into a given page
     * @param {PageNodeId} section
     * @returns {void}
     */
    ZoomInToSection(section) {
        App.pages.components1.content?.resetAnimationInitial();

        AnimatorService.pageOutro(App.activePage?.content ?? null, PageTransition.ZoomIn, 1.75);
        AnimatorService.transitionBackground(App.activePage?.background ?? null, App.pages[section].background, 0, 0, null, PageTransition.ZoomIn, 1.75);
        AnimatorService.pageIntro(App.pages[section].content, PageTransition.ZoomIn, 1.75);

        App.activePage = App.pages[section];
    }
}
