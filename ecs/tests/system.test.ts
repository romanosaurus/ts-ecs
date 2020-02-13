import ECSWrapper from "../wrapper/ECSWrapper";
import ASystem from "../abstract/ASystem";

test('create systems', () => {
    class TestSystem extends ASystem {
        constructor(name: string) {
            super(name);
        }

        onInit() {

        }

        onUpdate() {

        }

        onClose() {

        }
    };
    ECSWrapper.systems.initialize<TestSystem>(new TestSystem("test system"));
});