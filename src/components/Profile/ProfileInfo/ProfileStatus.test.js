import React from "react";
import s from './ProfileInfo.module.scss'
import ProfileStatus from "./ProfileStatus";
import { create } from "react-test-renderer";

describe("ProfileStatus component", () => {
    test("Status from props should be in the state", () => {
        const component = create(<ProfileStatus status = "it-kamasutra.com"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
    });

    test("After creation span with status should be displayed ", () => {
        const component = create(<ProfileStatus status = "it-kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull();
    });

    test("After creation  ", () => {
        const component = create(<ProfileStatus status = "it-kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe("it-kamasutra.com");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status = "it-kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe("it-kamasutra.com");
    });
});