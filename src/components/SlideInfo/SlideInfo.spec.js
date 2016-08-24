import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import SlideInfo from './SlideInfo.jsx';

describe('SlideInfo.jsx', () => {
    const mockProps = {
        views: 99
    };

    it('Should render expected components and content if passed expected props', (done) => {
        const component = mount(<SlideInfo {...mockProps} />);

        expect(component).to.be.ok;
        expect(component.find('.icon-eye').length, 'expect view icon').to.equal(1);
        expect(component.find('span').text()).to.equal('99 VIEWS');

        done();
    });
});
