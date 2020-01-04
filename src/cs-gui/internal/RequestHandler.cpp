////////////////////////////////////////////////////////////////////////////////////////////////////
//                               This file is part of CosmoScout VR                               //
//      and may be used under the terms of the MIT license. See the LICENSE file for details.     //
//                        Copyright: (c) 2019 German Aerospace Center (DLR)                       //
////////////////////////////////////////////////////////////////////////////////////////////////////

#include "RequestHandler.hpp"
#include "ResourceRequestHandler.hpp"

#include <fstream>
#include <include/wrapper/cef_stream_resource_handler.h>
#include <iostream>
#include <spdlog/spdlog.h>

namespace cs::gui::detail {

////////////////////////////////////////////////////////////////////////////////////////////////////

bool RequestHandler::OnCertificateError(CefRefPtr<CefBrowser> browser, cef_errorcode_t cert_error,
    CefString const& request_url, CefRefPtr<CefSSLInfo> ssl_info,
    CefRefPtr<CefRequestCallback> callback) {

  spdlog::warn("Detected certificate error. Continuing...");

  callback->Continue(true);
  return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

} // namespace cs::gui::detail
