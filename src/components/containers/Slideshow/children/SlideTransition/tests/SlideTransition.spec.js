import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';

import SlideTransition from '../SlideTransition';

describe('SlideTransition', () => {
    const mockProps = {
        slide: {
            backgroundSize: 'cover',
            direction: 'next',
            slide: {
                id: 'mock',
                src: 'mock',
                views: 1
            },
            transition: 'slide'
        },
        noSlide: {
            backgroundSize: 'cover',
            direction: 'next',
            transition: 'slide'
        }
    };

    describe('Basic rendering', () => {
        it('Should render expected components and content if no current slide is available yet', (done) => {
            const component = mount(
                <Provider
                    store={mockStore()}
                >
                    <SlideTransition {...mockProps.noSlide} />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('Slide').length, 'Slide').to.equal(0);

            done();
        });

        it('Should render expected components and content if slide is passed', (done) => {
            const component = mount(
                <Provider
                    store={mockStore()}
                >
                    <SlideTransition {...mockProps.slide} />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('Slide').length, 'Slide').to.equal(1);

            done();
        });
    });
});
