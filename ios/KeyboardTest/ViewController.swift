//
//  ViewController.swift
//  KeyboardTest
//
//  Created by 이은지 on 10/6/25.
//


import UIKit
import WebKit

class ViewController: UIViewController, UIScrollViewDelegate {
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupWebView()
        loadWebApp()
    }
    
    func setupWebView() {
        let config = WKWebViewConfiguration()
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        webView = WKWebView(frame: self.view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        // disable scroll and bounce
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        
        if #available(iOS 11.0, *) {
            webView.scrollView.contentInsetAdjustmentBehavior = .never
        }
        
        // set scroll view delegate
        webView.scrollView.delegate = self
        
        self.view.addSubview(webView)
        
        // register keyboard show observer
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(keyboardWillShow),
            name: UIResponder.keyboardWillShowNotification,
            object: nil
        )
    }
    
    func loadWebApp() {
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "build") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            print("Error: build/index.html not found in bundle")
        }
    }
    
    // MARK: - UIScrollViewDelegate
    
    // lock scroll
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        scrollView.contentOffset = .zero
    }

    // MARK: - Keyboard Handlers
    
    @objc func keyboardWillShow(notification: NSNotification) {
        webView.scrollView.contentOffset = .zero // lock scroll
    }
    
    // clean up
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
