import QtQuick 2.2
import QtQuick.Controls 1.2
import QtQuick.Layouts 1.0
import QtQuick.Window 2.0


import "Menu"
import "Nodes/node_handling.js" as Node

ApplicationWindow {
    id: application
    title: qsTr("Diaqml - Diagram Editor in QML")
    width: 640
    height: 480

    property int itemShapeGridSize: 40

    menuBar: MenuBar {
        Menu {
            title: qsTr("File")
            MenuItem {
                text: qsTr("Exit")
                onTriggered: Qt.quit();
            }
        }
    }

    MouseArea {
        anchors.fill: parent

        onClicked: { Node.select(null) }
    }



    SplitView {
        id: window
        anchors.fill: parent
        orientation: Qt.Horizontal

        Flipable {
            id: flipable
            //width: 240
            //height: 240
            Layout.minimumWidth: 200
            Layout.maximumWidth: 400

            property bool flipped: false

            front: ItemShapes {
                id: testdocument
                anchors.fill:parent

                documentArea: documentArea
            }
            back: Rectangle { anchors.fill:parent
                color: "green" }

            transform: Rotation {
                id: rotation
                origin.x: flipable.width/2
                origin.y: flipable.height/2
                axis.x: 0; axis.y: 1; axis.z: 0     // set axis.y to 1 to rotate around y-axis
                angle: 0    // the default angle
            }

            states: State {
                name: "back"
                PropertyChanges { target: rotation; angle: 180 }
                when: flipable.flipped
            }

            transitions: Transition {
                NumberAnimation { target: rotation; property: "angle"; duration: 440 }
            }

            Component.onCompleted: Node.setFlipable(flipable);
        }


        Rectangle {
            id: documentArea
            Layout.minimumWidth: 50
            Layout.fillWidth: true
            color: "darkgray"
        }
    }
}
