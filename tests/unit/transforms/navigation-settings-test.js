/* jshint expr:true */
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';
import Ember from 'ember';
import NavigationItem from 'ghost/models/navigation-item';

const emberA = Ember.A;

describeModule(
    'transform:navigation-settings',
    'Unit: Transform: navigation-settings',
    {
        // Specify the other units that are required for this test.
        // needs: ['transform:foo']
    },
    function() {
        it('deserializes navigation json', function () {
            let transform = this.subject();
            let serialized = '[{"label":"One","url":"/one"},{"label":"Two","url":"/two"}]';
            let result = transform.deserialize(serialized);

            expect(result.length).to.equal(2);
            expect(result[0]).to.be.instanceof(NavigationItem);
            expect(result[0].get('label')).to.equal('One');
            expect(result[0].get('url')).to.equal('/one');
            expect(result[1]).to.be.instanceof(NavigationItem);
            expect(result[1].get('label')).to.equal('Two');
            expect(result[1].get('url')).to.equal('/two');
        });

        it('serializes array of NavigationItems', function () {
            let transform = this.subject();
            let deserialized = emberA([
                NavigationItem.create({label: 'One', url: '/one'}),
                NavigationItem.create({label: 'Two', url: '/two'})
            ]);
            let result = transform.serialize(deserialized);

            expect(result).to.equal('[{"label":"One","url":"/one"},{"label":"Two","url":"/two"}]');
        });
    }
);
