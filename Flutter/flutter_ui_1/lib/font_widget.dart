import 'package:flutter/material.dart';

class FontWidget extends StatefulWidget {
  Function open;

  FontWidget(this.open);

  @override
  _FontWidgetState createState() => _FontWidgetState();
}

class _FontWidgetState extends State<FontWidget> with TickerProviderStateMixin {
  TabController _tabsController;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _tabsController = TabController(length: 4, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10)
      ),
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height,
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                GestureDetector(
                  onTap: widget.open,
                  child: Padding(
                    padding: EdgeInsets.only(left: 15, top: 10),
                    child: Icon(
                      Icons.menu,
                      color: Colors.grey,
                    ),
                  ),
                ),
                Expanded(
                    child: Padding(
                        padding: EdgeInsets.only(top: 10),
                        child: Center(
                          child: Text(
                            'Opendoor',
                            style: TextStyle(
                                color: Color(0xff266ed5), fontSize: 22),
                          ),
                        ))),
                Padding(
                  padding: EdgeInsets.only(right: 15, top: 10),
                  child: CircleAvatar(
                    child: FlutterLogo(
                      size: 20,
                    ),
                  ),
                )
              ],
            ),
            Padding(
              padding: EdgeInsets.only(top: 20, bottom: 20),
              child: Text(
                'Hello Eric',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 25),
              ),
            ),
            Container(
              color: Color(0xffeaf2f8),
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                child: Text(
                  '456 Connections Awe, Phonexin Az',
                  style: TextStyle(color: Color(0xff266ed5), fontSize: 12),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 20),
              child: SizedBox(
                height: 40,
                child: TabBar(
                  controller: _tabsController,
                  unselectedLabelColor: Colors.grey,
                  labelColor: Color(0xff266ed5),
                  isScrollable: true,
                  tabs: <Widget>[
                    Tab(child: Text('My House')),
                    Tab(child: Text('Market')),
                    Tab(child: Text('Tools')),
                    Tab(child: Text('Neigbourhood'))
                  ],
                ),
              ),
            ),
            SizedBox(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height - 80,
                child: TabBarView(
                  controller: _tabsController,
                  children: <Widget>[
                    _buildTabView(),
                    _buildTabView(),
                    _buildTabView(),
                    _buildTabView(),
                  ],
                )),
          ],
        ),
      ),
    );
  }

  Widget _buildTabView() {
    return Container(
      child: Card(
        margin: EdgeInsets.symmetric(horizontal: 50, vertical: 100),
        elevation: 5,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
        child: Text(''),
      ),
    );
  }
}
